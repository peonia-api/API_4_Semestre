import Swal from "sweetalert2";

function avisoConcluido () {
Swal.fire({
    title: "Sucesso",
    text: "Solicitação enviada com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

export { avisoConcluido };