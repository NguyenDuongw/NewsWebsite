$(document).ready(function(){
  let tokenAPI = '10b832fec0ac1d2bda6fff0ad1a97dfc';
    
  //Truy cập vào file json chứa breraking-new trên sever
  let link = 'https://gnews.io/api/v4/top-headlines?token='+tokenAPI+'&lang=en';
  fetch(link)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.articles.forEach(myFunction);  //vòng lặp forEach sẽ chạy myFunction đối với từng đối tượng trong mảng articles
      setTimeout(function() {             //hide gif loading sau 1 khoảng tg
        $('#loading').hide(); 
      }, 800);
    });
  
  //Hàm làm xuất hiện các news lên trang 
  function myFunction(item, index) {
    $('#img_'+index).attr('src', item.image);
    $('#tittle_'+index).html(item.title);
    $('#url_'+index).attr('href', item.url);
    $('#time_'+index).html(item.publishedAt);
    $('#descrip_'+index).html(item.description);
  }

  
  //Xuất hiện của sổ tìm kiếm và cái màn đen  
  $('#search').click(function(){
    $('.searchWindow').show();
    $('.visor').show();
  });
    
  //Đóng cửa sổ tìm kiếm
  $('#cancelIcon').click(function(){
    $('.searchWindow').hide();
    $('.visor').hide();
  });

  //Lúc bấm vào nút tìm kiếm 
  $('.searchBtn').click(function() {
    //đóng cửa sổ tìm kiếm
    $('.searchWindow').hide();
    $('.visor').hide();

    let searchIn = $('#searchIn').val();
    let timeIn = $('#timeIn').val();
    let linkAPI = 'https://gnews.io/api/v4/search?q='+searchIn+'&token='+tokenAPI+'&lang=en'+'&from='+timeIn;
    $('#loading').show();
    //lấy về trang web ứng với từ khóa tìm kiếm
    fetch(linkAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.articles.forEach(myFunction);
        setTimeout(function() {
          $('#loading').hide(); 
        }, 800); 
      });
  })
});