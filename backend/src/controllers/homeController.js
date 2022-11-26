import db from '../models/index';

let getHomePage = async (req, res) => {
    return res.render('homepage.ejs')
}


let getAboutPage = (req, res) => {
    return res.render('test/about.ejs'); // render ra about page
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}
