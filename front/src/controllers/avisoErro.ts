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

export { avisoErro, avisoErroDeletar };