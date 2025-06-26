export interface AdditionalInfoType {
  id?: number;                
  is_group?: boolean;
  title?: string;
  state?: 'DRAFT' | 'PUBLISHED' | string;
  active?: boolean;
  version?: number;
  schema?: string         
}
