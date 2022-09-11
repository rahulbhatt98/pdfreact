import React from 'react'
import { Table } from 'react-bootstrap'
const TableHeaders = (props: any) => {

  return (<>
    <div className="d-flex bg-white p-3 pe-5">
      
      <div className='align-self-center zr-datapoint-row'>Rows</div>
      <div style={{maxWidth: "100%", overflow: "auto" }}>
        <div className='text-center'>Columns</div>
        <Table responsive bordered hover className="zr-dataPoint-table">
          <tbody>
            <tr>
              <td style={{ background: "#983F96", color: "#fff" }}>-</td>

              {props?.data?.col_header?.map((e: any,i:any) => {
                return <td key={i} style={{ background: "#983F96", color: "#fff" }}>{e}</td>
              })}
            </tr>

            {props?.data?.row_header?.map((e: any,i:any) => {
              return <tr key={i}><td style={{ background: "#A5CD3A", color: "#fff" }}>{e}</td>
                {props?.data?.col_header.map((element: any,i:any) => {
                  return <td key={i}></td>
                })}</tr>
            })}     

          </tbody>
        </Table>
      </div>
    </div>
  </>
  )
}

export default TableHeaders