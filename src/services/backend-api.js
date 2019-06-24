import axios from 'axios'
const mainUrl = 'https://violet-back.herokuapp.com/';

var getCursos = id=>{
    return axios
    .get(mainUrl+'Curso/')
}
var getModulos = id=>{
    return axios
    .get(mainUrl+'Modulo/?curso='+id)
}
var getActividades = id=>{
    return axios
    .get(mainUrl+'Actividad/?modulo='+id)
}
var getContenidos = id=>{
    return axios
    .get(mainUrl+'Contenido/?actividad='+id)
}
var getRecurso = id=>{
    return axios
    .get(mainUrl+'Recurso/'+id)
}
export {getCursos,getModulos,getActividades,getContenidos,getRecurso}