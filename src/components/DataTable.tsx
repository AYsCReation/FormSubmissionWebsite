import React, { useEffect } from 'react';
import { useAppSelector } from '../store/store';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt';

const DataTables: React.FC = () => {
  const persons = useAppSelector((state) => state.person.persons);

  useEffect(() => {
    // Initialize DataTable
    const table: any = $('#myTable').DataTable({
      responsive: true,
      paging: true,
      ordering: true,
      searching: true,
      data: persons,  
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'Name', data: 'name' },
        { title: 'Age', data: 'age' },
        { title: 'Mobile', data: 'mobile' },
        { title: 'Sex', data: 'sex' },
        { title: 'Govt ID Type', data: 'govtIdType' },
        { title: 'Govt ID', data: 'govtId' },
        { title: 'Address', data: 'address' },
        { title: 'State', data: 'state' },
        { title: 'City', data: 'city' },
        { title: 'Pincode', data: 'pincode' },
        { title: 'Country', data: 'country' },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [persons]);

  return (
    <div>
      <h2>Data Table</h2>
      <table id="myTable" className="display responsive nowrap">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Sex</th>
            <th>Govt ID Type</th>
            <th>Govt ID</th>
            <th>Address</th>
            <th>State</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  );
};

export default DataTables;
