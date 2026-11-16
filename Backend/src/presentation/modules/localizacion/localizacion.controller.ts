import { Request, Response } from "express";
import { LocalizacionService } from "./localizacion.service";
import { HandleError } from "../../../domain/errors/handle.error";

export class LocalizacionController {
  private readonly service = new LocalizacionService();

  getAllPaises = (_req: Request, res: Response) => {
    this.service.getAllPaises()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getPaisById = (req: Request, res: Response) => {
    this.service.getPaisById(Number(req.params.id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  createPais = (req: Request, res: Response) => {
    const { nombre, codigo } = req.body;
    if (!nombre || !codigo) {
      return res.status(400).json({ error: "Missing nombre or codigo" });
    }
    this.service.createPais(nombre, codigo)
      .then((data) => res.status(201).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  updatePais = (req: Request, res: Response) => {
    const { nombre, codigo } = req.body;
    this.service.updatePais(Number(req.params.id), nombre, codigo)
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  deletePais = (req: Request, res: Response) => {
    this.service.deletePais(Number(req.params.id))
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };

  getAllDepartamentos = (_req: Request, res: Response) => {
    this.service.getAllDepartamentos()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getDepartamentoById = (req: Request, res: Response) => {
    this.service.getDepartamentoById(Number(req.params.id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  createDepartamento = (req: Request, res: Response) => {
    const { nombre, pais_id } = req.body;
    if (!nombre || !pais_id) {
      return res.status(400).json({ error: "Missing nombre or pais_id" });
    }
    this.service.createDepartamento(nombre, Number(pais_id))
      .then((data) => res.status(201).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  updateDepartamento = (req: Request, res: Response) => {
    const { nombre, pais_id } = req.body;
    this.service.updateDepartamento(Number(req.params.id), nombre, Number(pais_id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  deleteDepartamento = (req: Request, res: Response) => {
    this.service.deleteDepartamento(Number(req.params.id))
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };

  getAllCiudades = (_req: Request, res: Response) => {
    this.service.getAllCiudades()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getCiudadById = (req: Request, res: Response) => {
    this.service.getCiudadById(Number(req.params.id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  createCiudad = (req: Request, res: Response) => {
    const { nombre, departamento_id } = req.body;
    if (!nombre || !departamento_id) {
      return res.status(400).json({ error: "Missing nombre or departamento_id" });
    }
    this.service.createCiudad(nombre, Number(departamento_id))
      .then((data) => res.status(201).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  updateCiudad = (req: Request, res: Response) => {
    const { nombre, departamento_id } = req.body;
    this.service.updateCiudad(Number(req.params.id), nombre, Number(departamento_id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  deleteCiudad = (req: Request, res: Response) => {
    this.service.deleteCiudad(Number(req.params.id))
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}