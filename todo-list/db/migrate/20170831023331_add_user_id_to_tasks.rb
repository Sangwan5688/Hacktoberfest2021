class AddUserIdToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :user_id, :integer
  end
end
