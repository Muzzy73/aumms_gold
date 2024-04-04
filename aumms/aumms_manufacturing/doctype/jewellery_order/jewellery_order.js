// Copyright (c) 2024, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on("Jewellery Order", {
	refresh: function(frm) {
		let total_qty = frm.doc.jewellery_order_item.filter(function(row) {
			return row.is_available == 1;
		}).length;

		frm.set_value('available_item_quantity', total_qty);

		if (!frm.is_new()) {
			frm.set_df_property('customer_jewellery_order', 'read_only', 1);
			frm.set_df_property('customer', 'read_only', 1);
			frm.set_df_property('required_date', 'read_only', 1);
			frm.set_df_property('expected_total_weight', 'read_only', 1);
			frm.set_df_property('total_weight', 'read_only', 1);
			frm.set_df_property('quantity', 'read_only', 1);
			frm.set_df_property('design', 'read_only', 1);
		}

		frm.set_query('uom', () => {
			return {
				filters: {
					"is_purity_uom": 1
				}
			};
		});

		frm.set_query("item", "jewellery_order_item", () => {
			return {
				filters: {
					"item_type": frm.doc.type,
					"item_category": frm.doc.category
				}
			};
		});
<<<<<<< Updated upstream
  	},
		quantity: function(frm) {
			limit_item_details(frm)
		}
=======
	},

	quantity_of_available_item: function(frm) {
		limit_item_details(frm);
	}
>>>>>>> Stashed changes
});


frappe.ui.form.on("Jewellery Order Items",{
  weight: function(frm, cdt, cdn){
   let d = locals[cdt][cdn];
   var total_weightage = 0
   frm.doc.jewellery_order_item.forEach(function(d){
		 if (d.is_available) {
          total_weightage += d.weight;
    	}
   })
   frm.set_value('weight_of_available_item',total_weightage)
   frm.doc.item_details.forEach(function(d){
		 if (d.is_available) {
			  total_weightage += d.weight;

		 }
   })
	 frm.set_value('weight_of_available_item',total_weightage)
 },
 item_details_remove:function(frm){
	 	let d = locals[cdt][cdn];
     var total_weightage = 0
     frm.doc.jewellery_order_item.forEach(function(d){
	       total_weightage += d.weight;
     })
     frm.set_value("weight_of_available_item",total_weightage)
   },
   jewellery_order_item_add: function(frm)  {
    limit_item_details(frm)
	},
	is_available: function(frm, cdt, cdn) {
        let all_finished = true;
        let childtable = frm.doc.jewellery_order_item;
        for (let i = 0; i < childtable.length; i++) {
            if (!childtable[i].is_available) {
                all_finished = false;
                break;
            }
        }
        frm.set_value('finished', all_finished ? 1 : 0);
    }
});

function limit_item_details(frm) {
	if(frm.doc.quantity){
		availa_quantity = frm.doc.quantity
	}
	limit = availa_quantity
  if (frm.doc.jewellery_order_item.length >= limit)  {
    $(".btn.btn-xs.btn-secondary.grid-add-row").hide();
  }
  else  {
    $(".btn.btn-xs.btn-secondary.grid-add-row").show();
  }
}
// function calculate_quantity(frm, cdt, cdn){
// 	if (is_available)
// 	{
// 	var child=locals[cdt][cdn];
// 	len=0;
// 	for(i=0;i<len;i++)
// 	{
// 		i=row.length
// 	}
// }
//
// 	frappe.model.set_value(weight_of_available_item)
//   frm.refresh_field('jewellery_order_item');
// }
