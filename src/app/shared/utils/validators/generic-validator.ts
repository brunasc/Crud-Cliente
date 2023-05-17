import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class GenericValidator {
  //validar cpf
  static cpfValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const cpf = control.value.replace(/\D/g, '');
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
        return { 'invalidCPF': true };
      }
      if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999') || (cpf == '12345678909')) {
        return { 'incorrect': true };
      }
      let sum = 0;
      let rest;
      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      rest = (sum * 10) % 11;
      if ((rest === 10) || (rest === 11)) {
        rest = 0;
      }
      if (rest !== parseInt(cpf.substring(9, 10))) {
        return { 'invalidCPF': true };
      }
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      rest = (sum * 10) % 11;
      if ((rest === 10) || (rest === 11)) {
        rest = 0;
      }
      if (rest !== parseInt(cpf.substring(10, 11))) {
        return { 'invalidCPF': true };
      }
      return null;
    };
  }

  // validar nome com pelo menos um sobrenome
 static nomeClienteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nomeCliente = control.value;
      const possuiSobrenome = this.validarSobrenome(nomeCliente);
  
      return possuiSobrenome ? null : { sobrenomeAusente: true };
    };
  }
  
 static validarSobrenome(nomeCliente: string): boolean {
  if (!nomeCliente || nomeCliente.trim() === '') {
    return false; // Não há sobrenome se o nomeCliente for vazio ou nulo
  }
    const partesNome = nomeCliente.split(' ');
    return partesNome.length > 1;
  }

  // validar idade
  static idadeClienteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dataNascimento = control.value;
      const idade = this.calcularIdade(dataNascimento);
  
      if (idade >= 18 && idade < 60) {
        return null;
      } else {
        return { idadeInvalida: true };
      }
    };
  }
  
  static calcularIdade(dataNascimento: string): number {
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascimento);
  
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();
    const mesNasc = dataNasc.getMonth() + 1;
    const diaNasc = dataNasc.getDate();
  
    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }
  
    return idade;
  }


}
