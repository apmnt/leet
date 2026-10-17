// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]

// Input: head = [1,2]
// Output: [2,1]

// Input: head = []
// Output: []

var head = new ListNode(1, new ListNode(2, new ListNode(3)));
new Solution().ReverseList(head);

public class ListNode
{
    public int val;
    public ListNode next;
    public ListNode(int val = 0, ListNode next = null)
    {
        this.val = val;
        this.next = next;
    }
}


public class Solution
{
    public ListNode ReverseList(ListNode head)
    {
        ListNode previous = null;
        ListNode current = head;
        while (current != null)
        {
            ListNode next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        return previous;
    }
}
