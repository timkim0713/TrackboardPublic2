const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

var firestore = firebase.firestore();
const docRef = firestore.collection("rules");

var rules = [];

const newTr = `
<tr class="hide">
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

  // if ($tableID.find('tbody tr').length === 0) {
  //   $('tbody').append(newTr);
  // }
  // $tableID.find('table').append($clone);

  // if api call on success
    // generate the line to append, for now newTr as example
  $('tbody').append(newTr);
  $tableID.find('tbody tr').last().attr("id",rules.length);

  // else
  // alert() an error message
  rules.push({title: 'RULE TITLE', text: 'RULE DETAIL'});
  docRef.doc('sunykorea')
      .update({
        rules: rules
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
});

$tableID.on('click', '.table-remove', function () {

  // if api call on success
  var tr = $(this).parents('tr');
  // else
  // alert() an error message

  var title = tr.find('td')[0].innerText;
  var text = tr.find('td')[1].innerText;

  tr.detach();

  rules = rules.filter(rule => (rule['title'] != title && rule['text'] != text));

  docRef.doc('sunykorea')
      .update({
        rules: rules
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
});

$tableID.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');
  x = parseInt($row.attr('id'));

  if ($row.index() === 0) {
    return;
  }
  else {
    const y = x - 1;
    var b = rules[y];
    rules[y] = rules[x];
    rules[x] = b;

    $row.prev().attr('id', x);
    $row.attr('id', y);

    docRef.doc('sunykorea')
        .update({
          rules: rules
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
  }
  
  // if api call on success
  $row.prev().before($row.get(0));
  // else 
  // alert() an error message
});

$tableID.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  x = parseInt($row.attr('id'));

  if (x < rules.length - 1){
    const y = x + 1;
    var b = rules[y];
    rules[y] = rules[x];
    rules[x] = b;

    $row.next().attr('id', x);
    $row.attr('id', y);

    docRef.doc('sunykorea')
        .update({
          rules: rules
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
  }
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

  docRef.doc('sunykorea') //get suny korea data
      .get()
      .then(function (doc) {
        if (doc.exists) {
          makeRows(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

  $('table').keyup( delay(function(e) {
      var tr = $(e.target).closest("tr")[0];
      var cells = tr.cells;

      var newTitle = (cells[0].innerText);
      var newText = (cells[1].innerText);
      document.getElementById("savingText").innerHTML = "Succesfully saved.";

      rules[tr.id]['title'] = newTitle;
      rules[tr.id]['text'] = newText;
      docRef.doc('sunykorea')
              .update({
                rules: rules
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });

    }, 700)
  );
});

function makeRows(data) {
  var table = document.getElementById("rulesTable");
  var count = 0;

  for (rule of data.rules){
    var row = table.insertRow();

    rules.push(rule);
    row.id = count;
    count++;
    row.innerHTML = `<td class="pt-3-half" contenteditable="true">
                  ${rule['title']}
                </td>
                <td class="pt-3-half" contenteditable="true">
                  ${rule['text']}
                </td>
                <td class="pt-3-half">
                  <span class="table-up"
                    ><a href="#!" class="indigo-text"
                      ><i
                        class="fas fa-long-arrow-alt-up"
                        aria-hidden="true"
                      ></i></a
                  ></span>
                  <span class="table-down"
                    ><a href="#!" class="indigo-text"
                      ><i
                        class="fas fa-long-arrow-alt-down"
                        aria-hidden="true"
                      ></i></a
                  ></span>
                </td>
                <td>
                  <span class="table-remove"
                    ><button
                      type="button"
                      class="btn btn-danger btn-rounded btn-sm my-0"
                    >
                      Remove
                    </button></span
                  >
                </td>`;
  }
}

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