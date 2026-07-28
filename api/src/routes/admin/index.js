import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import upload from '../../middleware/upload.js';

import { login, me } from '../../controllers/admin/authController.js';
import { uploadImage } from '../../controllers/admin/uploadController.js';

import { getHome, updateHome } from '../../controllers/admin/homeController.js';
import { getAbout, updateAbout } from '../../controllers/admin/aboutController.js';
import { getProducts, updateProducts } from '../../controllers/admin/productsController.js';
import { getBlogs, updateBlogs } from '../../controllers/admin/blogsController.js';
import { getContact, updateContact } from '../../controllers/admin/contactController.js';
import { getPricingPolicy, updatePricingPolicy } from '../../controllers/admin/pricingPolicyController.js';
import { getPrivacyPolicy, updatePrivacyPolicy } from '../../controllers/admin/privacyPolicyController.js';
import { getRefundPolicy, updateRefundPolicy } from '../../controllers/admin/refundPolicyController.js';
import { getShippingPolicy, updateShippingPolicy } from '../../controllers/admin/shippingPolicyController.js';
import { getTerms, updateTerms } from '../../controllers/admin/termsController.js';
import { getWarrantyPolicy, updateWarrantyPolicy } from '../../controllers/admin/warrantyPolicyController.js';

const router = Router();

// Public: login. Everything after router.use(requireAuth) needs a token.
router.post('/auth/login', login);
router.use(requireAuth);

router.get('/auth/me', me);
router.post('/upload', upload.single('file'), uploadImage);

// One line per page: read for editing (GET) + save (PUT).
router.get('/home', getHome);
router.put('/home', updateHome);

router.get('/about-us', getAbout);
router.put('/about-us', updateAbout);

router.get('/products', getProducts);
router.put('/products', updateProducts);

router.get('/blogs', getBlogs);
router.put('/blogs', updateBlogs);

router.get('/contact-us', getContact);
router.put('/contact-us', updateContact);

router.get('/pricing-policy', getPricingPolicy);
router.put('/pricing-policy', updatePricingPolicy);

router.get('/privacy-policy', getPrivacyPolicy);
router.put('/privacy-policy', updatePrivacyPolicy);

router.get('/refund-policy', getRefundPolicy);
router.put('/refund-policy', updateRefundPolicy);

router.get('/shipping-policy', getShippingPolicy);
router.put('/shipping-policy', updateShippingPolicy);

router.get('/terms-and-conditions', getTerms);
router.put('/terms-and-conditions', updateTerms);

router.get('/warranty-policy', getWarrantyPolicy);
router.put('/warranty-policy', updateWarrantyPolicy);

export default router;
