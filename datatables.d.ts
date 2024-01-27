declare module 'datatables.net-dt' {
    interface DataTableSettings {
      responsive?: boolean;
    }
  
    interface DataTableStatic {
      (selector: string, options?: DataTableSettings): DataTable;
    }
  
    const DataTable: DataTableStatic;
    export = DataTable;
  }
  