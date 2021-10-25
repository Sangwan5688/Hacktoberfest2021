class LinkedList<T>
{
  private T value;
  private LinkedList<T> next;

  public LinkedList(T value, LinkedList<T> next) {
    SetValue(value);
    SetNext(next);
  }

  public LinkedList(T value) {
    this(value, null);
    }

  public T GetValue() {
    return value;
  }

  public LinkedList<T> GetNext() {
    return next;
  }

  public void SetValue(T value) {
    this.value = value;
  }

  public void SetNext(LinkedList<T> next) {
    this.next = next;
  }
}
