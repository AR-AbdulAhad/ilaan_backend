import prisma from '../config/db.js';

/**
 * Generates a URL-friendly, unique slug for a product based on model and family.
 * @param {string} model - The model code of the product.
 * @param {string} productFamily - The product family/category name.
 * @param {number|null} excludeId - Optional ID to exclude from uniqueness check (useful for edits).
 * @returns {Promise<string>} The generated unique slug.
 */
export async function generateUniqueSlug(model, productFamily, excludeId = null) {
  const base = `${model || ''} ${productFamily || ''}`.trim() || 'product';
  let slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')       // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)+/g, '');         // Trim leading/trailing hyphens

  if (!slug) slug = 'product';

  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const existing = await prisma.product.findFirst({
      where: {
        slug: uniqueSlug,
        ...(excludeId ? { NOT: { id: excludeId } } : {})
      }
    });

    if (!existing) {
      break;
    }

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}
