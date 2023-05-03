import Swal from "sweetalert2";

function avisoErro() {
  Swal.fire({
    title: "Erro",
    text: "Preencha corretamente todos os campos antes de enviar!",
    icon: "error",
    confirmButtonColor: "#54C5CE",
  });
} 

function avisoErroDeletar() {
  Swal.fire({
    icon: "error",
    title: "Ocorreu um erro!",
    text: "Não foi possível excluir o chamado.",
  });
}

function avisoErroAoDeletar(){
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: 'Não foi possível excluir!',
  })
}

function avisoErroLogin(){
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: 'Não foi possível realizar o login!',
  })
}

function avisoErroRequisicao(){
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: 'Houve um erro na requisição!',
  })
}

export { avisoErro, avisoErroDeletar, avisoErroAoDeletar, avisoErroLogin, avisoErroRequisicao };