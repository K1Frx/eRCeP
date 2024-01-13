export interface workerType {
  id?: number;
  birth_date: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  // contracts: string | null;
  user?: string;
}

export interface employerType {
  id?: number;
  name: string;
  nip: string;
  adress: string | null;
}

export interface contractType {
  id?: number;
  worker: number | string;
  employer: number | string;
  date_start: string;
  date_end?: string;
}

export interface timesheetType {
  type: number;
  worker: number;
  date: string;
  end_time: string | null;
  start_time: string | null;
  sum_min: number | null;
}