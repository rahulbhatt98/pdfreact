TO-DO
======Layout
-------
1. Home Page - Upload New Documents Spelling mistake: "Serach" ===> "Search" - Done


2. Re-arrange left tasks panel (see attached picture tasks_bar.png).Extract tables, images or pages - Done
3. Done4. 
4. "Save table" when no tables have been selected
If you click on "Save Table" BUT without selecting any tables, it opens up the normal save table screen but it should not. - Done


The "save Table" button should only be enabled if some tables have been selected. - Done

5. "Save Table"
Can you add a "select all" button to select automatically all the tables under the accordion. At present, one has to select tables one by one. - Done

6. Notice that the last two issues above apply to "images" and "pages" as wellManage Documents - Done


7. Bug - Pdf view/zoom does not work for the My Tables, My Pages, My images8. Add xml, html and xls functions to tab "My Tables"
In the section "Extract tables, images or pages", we have the functionality "xml, html and xls" after extracting tables.
When someone save a table to the "manage documents" section, we need to save also the "xml, html and xls" along with the table - see attached image "Mytables.png".Data points extraction - Done

9. List box "Where to get the data from"  --> "MY TABLES" If the user selected an item under "MY TABLES", the "collect_datapoints_with_headers" API has to be changed to search for tables rather than "PDF" or "documents_set"
This is how the API has to be changed for extracting data from saved tables: {
  "elastic_indx": "10k",
  "id_table": ["747cbb535d1f507469a35895d444295d_29_t_0","747cbb535d1f507469a35895d444295d_29_t_1"],   <==== replace "PDF" or "documents_set" with "id_table" and use the ids from the saved tables
  "row_header": ["Research and development expenses","Net income"],
  "row_header_match": "match",
  "row_header_min_score": 10,
  "col_header": ["2016"],
  "col_header_match": "exact_match",
  "col_header_min_score": -1,
  "deduplicate": "yes"
} - In progress

10. Listbox "Select one or more headers" - When the user has typed-in manually a row header in the listbox "Type in or Select rows headers", it should not show the next listbox - Done
- Enable user to type-in manually MULTIPLE row headers - Done
- Same thing should apply to the column headers list boxes - In progress

11. Data point grid results - For first level accordion, can you replace the text as follow:

Now:   DATAPOINT 0      Revenues       2017
DATAPOINT 1      Revenues       2017


Change to: 1.    ABAXIS_10.PDF Revenues       2017
2.    AKORN.PDF Revenues       2017 - Done


- Add a new "Expand all" or "Collapse" icon on the first level of accordions to expand/collapse all sub-accordions - In progress


12. Save grid results to excelPDF viewing - PDF highlighing
-----------------------------
13. PDF viewing in Data point extraction Grid - Alternative to showing the PDF when clicking : rather than a pop-up window, can we mouse-over a pdf viewer? - In progress