import {Patient} from './patient';

export class ResolvedPatientList {
  constructor(public patients: Patient[], public error: any = null){}
}
