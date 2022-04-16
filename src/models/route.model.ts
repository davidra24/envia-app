export interface RouteModel {
  id?: number;
  name?: string | null;
  description?: string | null;
  positions?: {
    latitude: number;
    longitude: number;
  } | null;
  message?: string;
}
