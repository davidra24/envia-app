export interface RouteModel {
  Id?: string | number;
  Name?: string | null;
  description?: string | null;
  positions?: {
    latitude: number;
    longitude: number;
  } | null;
  message?: string;
}
