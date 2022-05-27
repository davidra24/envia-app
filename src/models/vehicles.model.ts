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

export interface VehicleStatusModel {
  dateTime: Date;
  eventTipe: number | string;
  notes?: string;
  idVehicle: number | string;
}
