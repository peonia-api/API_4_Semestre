import Swal, { SweetAlertResult } from "sweetalert2";

function avisoConcluido(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Solicitação enviada com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

function avisoEdicao(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Edição realizada com sucesso!",
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
      "Para redefinir a senha, favor inserir abaixo o seu E-mail:",
    input: "email",
    inputPlaceholder: "E-mail",
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

function avisoEspera(): Promise<SweetAlertResult> {
  let timerInterval: any
  return Swal.fire({
    title: 'Enviando chamado!',
    html: 'O chamado será enviado em <b></b> milissegundos.',
    timer: 10000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b: any = Swal.getHtmlContainer()?.querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  })
}

function avisoPerfil(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Informações atualizadas com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

function avisoAlterarSenha(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Senha alterada com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

async function avisoDeletarAnexo(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Deletar anexo",
    text: "Essa ação não pode ser revertida",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar",
  });
}

async function avisoDesarquivar(): Promise<SweetAlertResult>{
  return Swal.fire({
    title: "Tem certeza?",
    text: "Você gostaria de reativar o chamado?",
    icon: "warning",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  });
}

function avisoEsperaAnexo(): Promise<SweetAlertResult> {
  let timerInterval: any
  return Swal.fire({
    title: 'Atualizando chamado!',
    html: 'O chamado será atualizado em <b></b> milissegundos.',
    timer: 10000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b: any = Swal.getHtmlContainer()?.querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  })
}


export { avisoConcluido, avisoDeletar, avisoConcuidoComite, senhaAlterada, solicitaEmail, avisoEspera, avisoEdicao, avisoPerfil, avisoDeletarAnexo, avisoEsperaAnexo, avisoDesarquivar, avisoAlterarSenha  };
