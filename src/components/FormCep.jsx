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
    // if (!ev.target.value) {
    //   return;

    const cep = ev.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
        setFocus("number");
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    alert(`    ${e.street}
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
            {...register("cep", { required: true, maxLength: 8 })}
            onBlur={checkCep}
          />
          {errors?.cep?.type === "required" && (
            <p className="error-message">Preencha o CEP.</p>
          )}
        </label>
        <label>
          Rua:
          <input type="text" {...register("street")} />
        </label>
        <label>
          Número:
          <input type="text" {...register("number")} />
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
