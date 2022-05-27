import { STATUS_ENUM } from '../../models';

export const statusGuide = (status: STATUS_ENUM) => {
  switch (status) {
    case 0: {
      return 'CREADA';
    }
    case 1: {
      return 'EN REGIONAL';
    }
    case 2: {
      return 'EN CLASIFICACIÓN';
    }
    case 3: {
      return 'EN REPARTO';
    }
    case 4: {
      return 'CANCELADO';
    }
    case 5: {
      return 'RECHAZADO POR ERROR DE DOCUMENTACIÓN';
    }
    case 6: {
      return 'RECHAZADO POR CLIENTE NO ENCONTRADO';
    }
    default:
      return '';
  }
};
