import sys

lines = []
with open(sys.argv[1], 'r') as f:
    lines = f.readlines()

state="header"
nums = []
frame = 1
frames = dict()
for line in lines:
    line = line.strip()
    if state == "header":
        if line == "":
            state = "frame"

    elif state == "frame":
        for num in filter(lambda x: len(x) > 0, line.split(" ")):
            if "-" in num:
                bits = [0] + [0 if x < 600 else 1 for x in nums[3:][::2]]
                splits = range(0,len(bits)+7,8)
                bytesb = [bits[s+8:s:-1] for s in splits]
                bytestr = ["".join(reversed([str(x) for x in b])) for b in bytesb]
                bitstr = " ".join(bytestr)
                print(str(frame) + " " + bitstr)
                frames[frame] = nums
                nums = []
                state = "trailer"
                break
            if num == "":
                continue

            nums.append(int(num))

    elif state == "trailer":
        if "-space" in line:
            state = "frame"
            frame = frame + 1
