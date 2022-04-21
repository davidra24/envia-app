export interface VehiclesModel {
  id: number;
  Nombre: string;
  Placa: string;
  RutaDefinida: string;
  EstadoVehiculo: number;
}

export interface PackageDeliveryModel {
  idVehicle: number;
  notes: string;
  dateTime: Date;
}
