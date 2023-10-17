import java.util.*;

public class RemoveInvalidParentheses {

    public List<String> removeInvalidParentheses(String s) {
        List<String> result = new ArrayList<>();
        if (s == null) {
            return result;
        }
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        boolean found = false;

        queue.offer(s);
        visited.add(s);

        while (!queue.isEmpty()) {
            int size = queue.size();
            Set<String> levelVisited = new HashSet<>();

            for (int i = 0; i < size; i++) {
                String current = queue.poll();

                if (isValid(current)) {
                    result.add(current);
                    found = true;
                }

                if (!found) {
                    for (int j = 0; j < current.length(); j++) {
                        if (Character.isLetter(current.charAt(j))) {
                            continue;
                        }

                        String newStr = current.substring(0, j) + current.substring(j + 1);
                        if (!visited.contains(newStr)) {
                            queue.offer(newStr);
                            levelVisited.add(newStr);
                        }
                    }
                }
            }

            if (found) {
                break;
            }

            visited.addAll(levelVisited);
        }

        return result;
    }

    private boolean isValid(String s) {
        int count = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '(') {
                count++;
            } else if (ch == ')') {
                count--;
                if (count < 0) {
                    return false;
                }
            }
        }
        return count == 0;
    }

    public static void main(String[] args) {
        RemoveInvalidParentheses solution = new RemoveInvalidParentheses();
        String input = "()())()";
        List<String> result = solution.removeInvalidParentheses(input);
        System.out.println("Valid Parentheses:");
        for (String valid : result) {
            System.out.println(valid);
        }
    }
}
