class AddDetailsToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :details, :text
  end
end
