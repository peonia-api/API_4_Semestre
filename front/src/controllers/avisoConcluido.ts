import Swal, { SweetAlertResult } from "sweetalert2";

function avisoConcluido(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Solicitação enviada com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

function senhaAlterada(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Senha alterada com êxito!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

function solicitaEmail(): Promise<SweetAlertResult> {
  return Swal.fire({
    title:
      "Para recuperar a senha, favor inserir abaixo o seu E-mail cadastrado:",
    input: "email",
    inputPlaceholder: "Insira o E-mail cadastrado aqui",
    allowOutsideClick: false,
  });
}

async function avisoDeletar(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Deletar chamado",
    text: "Essa ação não pode ser revertida",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar",
  });
}

function avisoConcuidoComite(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Avaliação atribuída com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}


export { avisoConcluido, avisoDeletar, avisoConcuidoComite, senhaAlterada, solicitaEmail };