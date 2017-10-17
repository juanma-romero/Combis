/* get home page */


module.exports.home = function (req,res) {
    res.render('home', {
        title: 'Buscar servicio',
        pageHeader: {
            title: 'Home de CombisOnLine'
        }
        
    });
}
module.exports.busqueda = function (req,res) {
    res.render('busqueda', {
        title: 'Listado de servicios',
        pageHeader: {
            title: 'Listado de servicios disponibles'
        }
    });
}
module.exports.servicio = function (req,res) {
    res.render('servicio', {title: 'Servicio disponible'});
}
module.exports.empresa = function (req,res) {
    res.render('empresa', {title: 'Empresa'});
}
module.exports.sobreCombi = function (req,res) {
    res.render('sobreCombi', {title: 'Sobre CombisOnLine'});
}