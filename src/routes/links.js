const express = require('express');
const router = express.Router();

// pool hace referencia a la conexión de la BD 
const pool = require('../database');
const { isLoggedIn }  = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res) => {
  res.render('./links/add');
});

/* VISTA QUE TOMA LOS DATOS */
router.post('/add', isLoggedIn, async (req,res) => {
 const {title, url,description } = req.body;

 const newLink = {
	 title,
	 url,
	 description,
	 user_id: req.user.id,
 };
 // el simbolo ? significa que vamos a pasar un dato a continuación
 await pool.query('INSERT INTO links set ?', [newLink]);
 req.flash('success','Link saved successfully');
 res.redirect('/links');
});

router.get('/', isLoggedIn, async (req,res) => {
 const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
 //console.log(links);
 res.render('links/list',{links: links});
});


router.get('/delete/:id', isLoggedIn, async (req,res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM links WHERE ID = ?', [id]);
	req.flash('success','Links removed successfully');
	res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params; 
    const links = await pool.query('SELECT * FROM links where ID = ?', [id]);
    res.render('links/edit', { link: links[0] } );
});

router.post('/edit/:id', isLoggedIn, async (req,res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const newLink = {
	  title,
	  description,
	  url
  };
  await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);
  req.flash('success','Link updated successfully');
  res.redirect('/links');
  	
});

module.exports = router;
