frappe.ui.form.on('Item Group', {
  refresh(frm) {
    set_item_type_property(frm);
  },
  parent_item_group(frm) {
    set_item_type_property(frm);
  },
  making_charge_based_on(frm) {
    // set currency = 0 while the change of making_charge_based_on
    if(frm.doc.making_charge_based_on == 'Fixed'){
      frm.refresh_field('currency')
      frm.set_value('currency', 0)
    }
    // set percentage = 0 while the change of making_charge_based_on
    if(frm.doc.making_charge_based_on == 'Percentage'){
      frm.refresh_field('percentage')
      frm.set_value('percentage', 0)
    }
  }
});

let set_item_type_property = function(frm) {
  // Change property of item_type
  frm.set_df_property('item_type', 'read_only', 0)
  if (frm.doc.parent_item_group) {
    frappe.db.get_value('Item Group', frm.doc.parent_item_group, 'item_type').then(r => {
      if (r.message.item_type) {
        // set item_type as read only and fetching from parent
        frm.set_value('item_type', r.message.item_type);
        frm.set_df_property('item_type', 'read_only', 1);
      }
    });
  }
}
