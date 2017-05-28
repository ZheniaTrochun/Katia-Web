'use strict';


let pagesDB = {};
let currentItem;

const renderDB = (res) => {
  if (!res) {
    console.log('err');
  }
  pagesDB = res;

  console.log(res);

  $('#table-holder').html('');

  for(let i = 0; i < res.length; i++) {
    $('#table-holder').html($('#table-holder').html() + '<div class="row" id="row' + i + '">' +
      '<div class="col-md-6">' +
        '<p id="title' + i + '" onclick="editPage(' + i + ')">' + res[i].title + '</p>' +
      '</div>' +
      '<div class="col-md-6">' +
        '<button class="btn btn-danger" onclick="killRow(' + i + ')">Kill</p>' +
      '</div>' +
    '</div>');
  }
};

$.ajax({
  type: 'GET',
  url: '/getHtmlTable',
  success: renderDB
});

const editPage = (i) => {
  $('#tableModal').modal('toggle');
  $('#editModal').modal('show');

  $('#titleTextArea').val(pagesDB[i].title);
  $('#metaTextArea').val(pagesDB[i].meta);
  $('#bodyTextArea').val(pagesDB[i].body);
};

const saveRow = () => {
  $.ajax({
    type: 'POST',
    url: '/saveRow',
    data: {
      title: $('#titleTextArea').val(),
      meta: $('#metaTextArea').val(),
      body: $('#bodyTextArea').val()
    },
    success: renderDB
  });

  $('#editModal').modal('toggle');
};

const killRow = (i) => {
  console.log(i);
  $('#row' + i).hide();
  $.ajax({
    type: 'POST',
    url: '/killRow',
    data: {
      name: $('#title' + i).html()
    },
    success: res => {
      console.log('Killed successfully');
    }
  });
};
