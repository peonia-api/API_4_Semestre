import Swal from "sweetalert2";

function avisoErro() {
  Swal.fire({
    title: "Erro",
    text: "Preencha corretamente todos os campos antes de enviar!",
    icon: "error",
    confirmButtonColor: "#54C5CE",
  });
} 

export { avisoErro };