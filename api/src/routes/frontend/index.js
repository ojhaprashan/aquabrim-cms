import { Router } from 'express';

import { getHome } from '../../controllers/frontend/homeController.js';
import { getAbout } from '../../controllers/frontend/aboutController.js';
import { getProducts } from '../../controllers/frontend/productsController.js';
import { getBlogs } from '../../controllers/frontend/blogsController.js';
import { getContact } from '../../controllers/frontend/contactController.js';
import { getPricingPolicy } from '../../controllers/frontend/pricingPolicyController.js';
import { getPrivacyPolicy } from '../../controllers/frontend/privacyPolicyController.js';
import { getRefundPolicy } from '../../controllers/frontend/refundPolicyController.js';
import { getShippingPolicy } from '../../controllers/frontend/shippingPolicyController.js';
import { getTerms } from '../../controllers/frontend/termsController.js';
import { getWarrantyPolicy } from '../../controllers/frontend/warrantyPolicyController.js';

const router = Router();

// One line per page: the public site reads content here (no auth).
router.get('/home', getHome);
router.get('/about-us', getAbout);
router.get('/products', getProducts);
router.get('/blogs', getBlogs);
router.get('/contact-us', getContact);
router.get('/pricing-policy', getPricingPolicy);
router.get('/privacy-policy', getPrivacyPolicy);
router.get('/refund-policy', getRefundPolicy);
router.get('/shipping-policy', getShippingPolicy);
router.get('/terms-and-conditions', getTerms);
router.get('/warranty-policy', getWarrantyPolicy);

export default router;
