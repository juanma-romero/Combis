/* get home page */


module.exports.home = function (req,res) {
    res.render('home', {title: 'Buscar servicio'});
}
module.exports.busqueda = function (req,res) {
    res.render('index', {title: 'Listado de servicios'});
}
module.exports.servicio = function (req,res) {
    res.render('index', {title: 'Servicio disponible'});
}
module.exports.empresa = function (req,res) {
    res.render('index', {title: 'Empresa'});
}
module.exports.sobreCombi = function (req,res) {
    res.render('index', {title: 'Sobre CombisOnLine'});
}