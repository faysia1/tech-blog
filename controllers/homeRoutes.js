const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');

//homepage renders a list of existing blogs
router.get('/', async (req, res) => {
	try {
		const blogPostData = await BlogPost.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},
			],
		});

		const blogPosts = blogPostData.map((blogPost) => blogPost.get({
			plain: true
		}));

		res.render('homepage', {
			logged_in: req.session.logged_in,
			user_name: req.session.user_name,
		  });
		} catch (err) {
		  res.status(500).json(err);
		}
});

//dashboard renders a list of the users blogs
router.get('/dashboard', async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Blog
			}],
		});
		const user = userData.get({
			plain: true
		});
		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//reroutes the user to the dashboard page if logged in
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

module.exports = router;