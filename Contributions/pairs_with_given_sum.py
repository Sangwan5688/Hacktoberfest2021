#!/usr/bin/env python3

"""
Given an array of integers and an integer req_sum, find the number of pairs of array
elements whose sum is equal to req_sum.

https://practice.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/0
"""
from itertools import combinations


def pairs_with_sum(arr: list, req_sum: int) -> int:
    """
    Return the no. of pairs with sum "sum"
    """
    return len([1 for a, b in combinations(arr, 2) if a + b == req_sum])
