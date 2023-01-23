import React from "react";
import "./FormCep.css";
import { useForm } from "react-hook-form";

const FormCep = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();

  const checkCep = (ev) => {
    const cep = ev.target.value.replace(/\D/g, "");

    const apiCep = fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const cepIsValid = (cep) => {
      cep.length == 8;
    };
    // const getCep = async () => {
    //   const req = await fetch("https://viacep.com.br/ws/110756800/json");

    apiCep.then((res) => {
      const response = res.json().then((data) => {
        if (data.hasOwnProperty("erro")) {
          console.log("erro");
          setValue("street", (data.logradouro = "CEP Inválido"));
        } else {
          setValue("street", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
          setFocus("number");

          console.log(res);
          console.log(data.logradouro);
        }
      });
    });
  };

  const onSubmit = (e) => {
    alert(`    ${e.street}
    Número: ${e.number}
    Bairro: ${e.neighborhood}
    Cidade: ${e.city}
    Estado: ${e.state}`);
  };

  return (
    <div className="inform-cep">
      <h1>CONSULTA CEP</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="input-container">
        <label>
          CEP:
          <input
            className={errors?.cep && "input-error"}
            type="number"
            {...register("cep", { required: true, minLength: 7, maxLength: 8 })}
            onBlur={checkCep}
          />
          {errors?.cep?.type === "required" && (
            <p className="error-message">Preencha o CEP.</p>
          )}
          {errors?.cep?.type === "minLength" && (
            <p className="error-message">Mínimo de oito números</p>
          )}
          {errors?.cep?.type === "maxLength" && (
            <p className="error-message">Máximo de oito números</p>
          )}
        </label>
        <label>
          Rua:
          <input type="text" {...register("street")} />
        </label>
        <label>
          Número:
          <input
            className={errors?.number && "input-error"}
            type="number"
            {...register("number", { required: true })}
          />
          {errors?.number?.type === "required" && (
            <p className="error-message">Preencha o número.</p>
          )}
        </label>
        <label>
          Bairro:
          <input type="text" {...register("neighborhood")} />
        </label>
        <label>
          Cidade:
          <input type="text" {...register("city")} />
        </label>
        <label>
          Estado:
          <input type="text" {...register("state")} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCep;
