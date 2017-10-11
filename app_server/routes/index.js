var express = require('express');
var router = express.Router();
var ctrolPaginas = require('../controllers/primerasPaginas');

/* GET home page. */

var homePageController = function (req, res) {
  res.render('index', { title: 'Combis'});
}


router.get('/', ctrolPaginas.home);
router.get('/busqueda', ctrolPaginas.busqueda);
router.get('/servicio', ctrolPaginas.servicio);
router.get('/empresa', ctrolPaginas.empresa);
router.get('/sobreCombi', ctrolPaginas.sobreCombi);

module.exports = router;
