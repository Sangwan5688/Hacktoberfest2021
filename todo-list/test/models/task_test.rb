require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  setup do
    sign_in users(:userOne)
  end

  test "valid task with task name length greater than or equal to 3 characters" do
    task = tasks(:validTask)
    assert task.valid?
  end

  test "invalid task without task name" do
    task = tasks(:taskWithoutName)
    refute task.valid?, 'task is not valid without a task name'
    assert_not_nil task.errors[:task], 'no validation error for task name present'
  end

  test "invalid task with task name length less than 3 characters" do
    task = tasks(:taskWithShortName)
    refute task.valid?, 'task is not valid with length less than 3 characters'
    assert_not_nil task.errors[:task], 'no validation error for task name length'
  end
end
