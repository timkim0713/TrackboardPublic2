const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

const newTr = `
<tr class="hide">
  <td class="pt-3-half" style="display: none;" >X</td>
  <td class="pt-3-half" contenteditable="true">RULE TITLE</td>
  <td class="pt-3-half" contenteditable="true">RULE DETAIL</td>
  <td class="pt-3-half">
    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
  </td>
  <td>
    <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
  </td>
</tr>`;

$('.table-add').on('click', 'i', () => {

  const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

  // if ($tableID.find('tbody tr').length === 0) {
  //   $('tbody').append(newTr);
  // }
  // $tableID.find('table').append($clone);


  
  // TODO Call api to create new row
  // if api call on success
    // generate the line to append, for now newTr as example
    $('tbody').append(newTr);
  // else 
  // alert() an error message

});

$tableID.on('click', '.table-remove', function () {

  // TODO Call api to delete this row
  // if api call on success
  $(this).parents('tr').detach();
  // else 
  // alert() an error message

});

$tableID.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');

  if ($row.index() === 0) {
    return;
  }
  
  // TODO Call api to change ordering of row
  // if api call on success
  $row.prev().before($row.get(0));
  // else 
  // alert() an error message
});

$tableID.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  // TODO Call api to change ordering of row
  // if api call on success
  $row.next().after($row.get(0));
  // else 
  // alert() an error message
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.on('click', () => {

  const $rows = $tableID.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {

    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {

      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));
});

$(document).ready(function() {
  $('table').keyup( delay(function(e) {
      var cells = $(e.target).closest("tr")[0].cells;
      console.log(cells[0].innerText);
      console.log(cells[1].innerText);
      console.log(cells[2].innerText);
      document.getElementById("savingText").innerHTML = "Succesfully saved.";
      // TODO properly save into firebase
    }, 700)
  );
});

function delay(fn, ms) {
  let timer = 0
  return function(...args) {
    clearTimeout(timer);
    document.getElementById("savingText").innerHTML = "Saving...";
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  };
}

// $('#input').keyup(delay(function (e) {
//   console.log('Time elapsed!', this.value);
// }, 500));