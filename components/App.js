import Marionette from 'backbone.marionette';
import ItemView from './ItemView';

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new ItemView());

    // Displays the current number of entries.
    let count = 0
    $('#total').text(count)

    let table = new Set()

    /**
     * Onclick function to add a new record to the set and display it.
     * Event gets triggered when the user clicks the 'Add' button.
     * This function checks if the set already has the new entry and prevents duplicates.
     * Once the set is updated, a newly generated table is displayed.
    */
    $('button').click(function() {
      let name = $('#name-field').val()
      let date = $('#datepicker').val()
      // Checking for empty values.
      if (name === '' || date === '') {
        alert('Empty values are not allowed.')
      } else {
        const dateFormat = formatDate(date)

        let newEntry = name + '| ' + dateFormat
        // Checking for duplicate values and adding valid entries.
        if (!table.has(newEntry)) {
          table.add(newEntry)
          newEntry = ''
          count = table.size
          $('#total').text(count)

          let tableContent = createTable()
          $('#table').html(tableContent)
        } else {
          alert('Duplicate elements not allowed.')
        }
      }
    })

    /**
     * Onclick function to delete an existing record within the set.
     * Event gets triggered when the user clicks any 'Delete' link.
     * Once the set is updated, a newly generated table is displayed.
    */
    $(document).on('click', '.delete-link', function(event) {
      const checkEntry = event.target.id
      table.delete(checkEntry)
      count = table.size
      $('#total').text(count)

      let tableContent = createTable()
      // Hiding the table if empty.
      if (count === 0) {
        $('#table').html('')
      } else {
        $('#table').html(tableContent)
      }
    })

    /**
     * Helper function to return the date in Month, day and year format.
     * @param {Date} date in MM/DD/YYYY format
     * @returns {Date} newDate
     */
    function formatDate(date) {
      const newDate = new Date(date)
      return newDate.toLocaleString('default', { month: 'long' , day: 'numeric', year: 'numeric'});
    }

    /**
     * Helper function to create a dynamic table.
     * This function generates a table with 3 columns.
     * @returns {string} tableContent the HTML code within a string.
     */
    function createTable() {
      let tableContent = '<table id="data-table"><tr><th>Name</th><th>Birth Date</th><th>Actions</th><tr>'
      for (let item of table) {
        let itemArray = item.split('|')
        tableContent += '<tr><td>' + itemArray[0] + '</td>' + '<td>' + itemArray[1] + '</td>' + '<td><p class="delete-link" id="' + item + '">Delete</p></td></tr>';
      }
      tableContent += '</table>'

      return tableContent
    }
  }
})
