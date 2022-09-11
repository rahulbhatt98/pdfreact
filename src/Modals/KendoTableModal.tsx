import React from 'react'
import { Modal } from "react-bootstrap";
import { Grid, GridColumn, GridGroupChangeEvent, GridExpandChangeEvent, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { groupBy, GroupDescriptor, GroupResult } from '@progress/kendo-data-query';
import { setExpandedState, setGroupIds } from '@progress/kendo-react-data-tools';
import { GridPDFExport } from '@progress/kendo-react-pdf';

const processWithGroups = (data: any[], group: GroupDescriptor[]) => {
  const newDataState = groupBy(data, group);
  setGroupIds({ data: newDataState, group: group });
  return newDataState;
};

const KendoTableModal = (props: any) => {
  const [group, setGroup] = React.useState([{ field: 'PDF' }]);
  const [resultState, setResultState] = React.useState<any>(processWithGroups(props.data, [{ field: 'PDF' }]));
  const [collapsedState, setCollapsedState] = React.useState<string[]>([]);
  
  let gridPDFExport: GridPDFExport | null;
  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
  };

  let _export: ExcelExport | null;
  const exportExcel = () => {
    if (_export !== null) {
      _export.save();

    }
  }
  const onGroupChange = React.useCallback(
    (event: GridGroupChangeEvent) => {
      const newDataState = processWithGroups(props.data, event.group);

      setGroup(event.group);
      setResultState(newDataState);
    },
    []
  );

  const onExpandChange = React.useCallback(
    (event: GridExpandChangeEvent) => {
      const item = event.dataItem;
      if (item.groupId) {
        const newCollapsedIds = !event.value ?
          [...collapsedState, item.groupId] :
          collapsedState.filter(groupId => groupId !== item.groupId);
        setCollapsedState(newCollapsedIds);
      }
    },
    [collapsedState]
  );

  const newData = setExpandedState({
    data: resultState,
    collapsedIds: collapsedState
  });

  const grid = (
    <Grid
      data={newData}
      groupable={true}
      onGroupChange={onGroupChange}
      group={group}
      onExpandChange={onExpandChange}
      expandField="expanded"
    >
      <GridToolbar>
        <button
          title="Export PDF"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={exportExcel}
        >
          Export Excel
        </button>
        <button
          title="Export PDF"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={exportPDF}
        >
          Export PDF
        </button>
      </GridToolbar>
      <GridColumn field="PDF" title="PDF" />
      <GridColumn field="page" title="Page" width="120px" />
      <GridColumn field="row_header_texts" title="Row Headers" />
      <GridColumn field="col_header_texts" title="Column Headers" />
      <GridColumn field="data_point_text" title="Value" />
    </Grid>)

  return (
    <Modal
      show={props.showKenod}
      onHide={props.handleClose}
      dialogClassName="zr-custom-extract-modal-dialogue"
      className="zr-custom-extract-modal"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="zr-custom-modal-body">
        <GridPDFExport ref={(pdfExport: any) => (gridPDFExport = pdfExport)}>
          {grid}
        </GridPDFExport>
        <ExcelExport data={resultState}
          ref={(exporter) => { _export = exporter; }}
          group={group}
        >
          {grid}
        </ExcelExport>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}

export default KendoTableModal