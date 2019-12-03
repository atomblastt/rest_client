
 			$.ajax({
		    url: 'http://localhost/rest_server/index.php/api/produk',
		    type: 'get',
		    dataType: 'json',
		    data: {
		      'key' : 'test123'
		    },
		    success: function (result){
		     		// $('#produk-list').html('<h1>Data Tidak di Temukan</h1>')
		     		var produk = result.data;
				    	console.log(produk);
		     		$.each(produk, function (i, data) {
		     			$('#produk-list').append(`
							    <tr>
							      <td>`+data.nama_produk+`</td>
							      <td>`+data.harga+`</td>
							      <td>`+data.stok+`</td>
							      <td>
							      <button type="button" class="btn btn-success see-detail" data-toggle="modal" data-target="#edit" data-id="`+data.id_produk+`">
							      Update
							      </button>
							      
							      <button type="button" class="btn btn-danger delete-detail" data-toggle="modal" data-target="#delete" data-id="`+data.id_produk+`">
							      Delete
							      </button>
							    </tr>
		     				`)
		     		})
		    }
		  });

 		 $('#produk-list').on('click','.see-detail', function() {

 			$.ajax({
		    url: 'http://localhost/rest_server/index.php/api/produk',
		    type: 'get',
		    dataType: 'json',
		    data: {
		      'key' : 'test123',
		      'id_produk' : $(this).data('id')
		    },
		    success: function (row){
		     		var produk = row.data;

		     		console.log(produk);

		     		$('#modal-edit').html(`

		     			<form method="post" class="form-user" id="edit_data">

		     				<div class="form-group" hidden="">
				              <label>Nama Produk</label>
				              <input type="text" class="form-control" name="id_produk" value="`+produk.id_produk+`" >
				            </div>

				           <div class="form-group">
				              <label>Nama Produk</label>
				              <input type="text" class="form-control" name="nama_produk" value="`+produk.nama_produk+`" >
				            </div>

				            <div class="form-group">
				              <label>Harga</label>
				              <input type="number" class="form-control" name="harga" value="`+produk.harga+`">
				            </div>

				            <div class="form-group">
				              <label>Stok</label>
				              <input type="number" class="form-control" name="stok" value="`+produk.stok+`">
				            </div>            
				        </form>

		     			`)
				    	
		    }
		  });
 		});
		 

		 $('#simpan-button').on('click',function () {

			 $.ajax({
			    url: 'http://localhost/rest_server/index.php/api/produk',
			    type: 'POST',
			    dataType: 'json',
			    data: $('#tambah_data').serialize() + "&key=test123", 
			    success: function(add) {
			    	// console.log(add);
			    	$('#tambah').modal('hide')
			    	alert(add.message)
			    	if(add.status == true){
			    		$('#produk-list').load('produk.php');
			    	}
			    	
			    }

			});

		});


		 $('#edit-button').on('click', function() {

		 	 $.ajax({
			    url: 'http://localhost/rest_server/index.php/api/produk',
			    type: 'put',
			    dataType: 'json',
			    data: $('#edit_data').serialize() + "&key=test123", 
			    success: function() {
			    	$('#edit').modal('hide')
			    	alert('Data BErhasil di Edit')
			    		location.reload();
			    }

			});
		 	// console.log($(this).data('id'));
		 })

		 $('#produk-list').on('click','.delete-detail', function() {
 			$.ajax({
		    url: 'http://localhost/rest_server/index.php/api/produk',
		    type: 'get',
		    dataType: 'json',
		    data: {
		      'key' : 'test123',
		      'id_produk' : $(this).data('id')
		    },
		    success: function (row){
		     		var produk = row.data;

		     		console.log(produk);

		     		$('#modal-delete').html(`

		     			<p>Yakin Ingin Menghapus data `+produk.nama_produk+` ?</p>

		     			`)
		     		$('#delete-button').on('click', function() {

				 	 $.ajax({
					    url: 'http://localhost/rest_server/index.php/api/produk',
					    type: 'DELETE',
					    dataType: 'json',
					    data: {
					    	'key' : 'test123',
					    	'id_produk' : produk.id_produk
					    }, 
					    success: function() {
					    	$('#delete').modal('hide')
					    	alert('Data Berhasil di Hapus')
					    		location.reload();
					    }

					});
				 	// console.log($(this).data('id'));
				 })    	
		    }
		  });
 		});

		 $('#delete-button').on('click', function() {

		 	 $.ajax({
			    url: 'http://localhost/rest_server/index.php/api/produk',
			    type: 'DELETE',
			    dataType: 'json',
			    data: {
			    	'key' : 'test123',
			    	'id_produk' : $('#edit_data').serialize()
			    }, 
			    success: function() {
			    	$('#delete').modal('hide')
			    	alert('Data Berhasil di Hapus')
			    		location.reload();
			    }

			});
		 	// console.log($(this).data('id'));
		 })