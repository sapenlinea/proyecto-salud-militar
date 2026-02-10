export interface AdminUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  roles: string[];
  active: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  module: string;
}

export interface SystemParameter {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  userId: string;
  userName: string;
  timestamp: string;
  details?: string;
}

export interface CatalogItem {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

export interface MasterCatalog {
  id: string;
  name: string;
  description: string;
  items: CatalogItem[];
}
