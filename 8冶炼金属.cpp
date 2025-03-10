#include<bits/stdc++.h>
using namespace std;

// a数组存储每次冶炼投入的普通金属O的数量，b数组存储对应产出的特殊金属X的数量
int a[10010], b[10010];
int n; // 冶炼记录的数量

// 函数check1用于检查给定的转换率mid是否可能是转换率V的最小值
// 即对于所有记录，用a[i]/mid得到的特殊金属X的数量不会大于b[i]
bool check1(int mid) {
    for(int i=0; i<n; i++) {
        if(a[i]/mid > b[i]) return false;
    } 
    return true;
}

// 函数check2用于检查给定的转换率mid是否可能是转换率V的最大值
// 即对于所有记录，用a[i]/mid得到的特殊金属X的数量不会小于b[i]
bool check2(int mid) {
    for(int i=0; i<n; i++) {
        if(a[i]/mid < b[i]) return false;
    } 
    return true;
}

int main() {
    cin >> n;
    int maxn = 0; // 存储所有冶炼记录中投入普通金属O的最大值
    for(int i=0; i<n; i++) {
        cin >> a[i] >> b[i];
        if(a[i] > maxn) maxn = a[i]; // 更新最大值
    }
    // 寻找可能的最小转换率V
    int l=1, r=maxn;
    while(l < r) {
        int mid = l + (r - l) / 2;
        if(check1(mid)) r = mid; // 如果mid作为转换率可能是最小值，则向左（减小mid）搜索
        else            l = mid + 1; // 否则向右（增大mid）搜索
    }
    cout << l << " "; // 输出可能的最小转换率V
    
    // 重置l和r，寻找可能的最大转换率V
    l=1, r=maxn;
    while(l < r) {
        int mid = l + (r - l + 1) / 2;
        if(check2(mid)) l = mid; // 如果mid作为转换率可能是最大值，则向右（增大mid）搜索
        else            r = mid - 1; // 否则向左（减小mid）搜索
    }
    cout << l; // 输出可能的最大转换率V
    return 0;
}
