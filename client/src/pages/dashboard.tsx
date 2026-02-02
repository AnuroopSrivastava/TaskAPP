import * as React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Check,
  ChevronDown,
  Info,
  LogOut,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Priority = "low" | "medium" | "high";
type Status = "todo" | "in_progress" | "done";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
};

const seedTasks: Task[] = [
  {
    id: "tsk_1",
    title: "Design login states",
    description: "Loading, error, success — with smooth motion.",
    priority: "high",
    status: "in_progress",
    createdAt: "Today",
  },
  {
    id: "tsk_2",
    title: "Dashboard layout",
    description: "Glass cards, spacing rhythm, and clear hierarchy.",
    priority: "medium",
    status: "todo",
    createdAt: "Today",
  },
  {
    id: "tsk_3",
    title: "CRUD interactions",
    description: "Create, edit, mark done — no jank.",
    priority: "low",
    status: "done",
    createdAt: "Yesterday",
  },
];

function priorityBadge(p: Priority) {
  switch (p) {
    case "high":
      return "bg-[hsl(0_84%_60%_/_0.12)] text-red-200 border border-red-500/20";
    case "medium":
      return "bg-[hsl(40_90%_60%_/_0.12)] text-amber-200 border border-amber-500/20";
    default:
      return "bg-[hsl(200_92%_58%_/_0.10)] text-cyan-100 border border-cyan-500/20";
  }
}

function statusBadge(s: Status) {
  switch (s) {
    case "done":
      return "bg-[hsl(140_62%_55%_/_0.12)] text-emerald-200 border border-emerald-500/20";
    case "in_progress":
      return "bg-[hsl(258_90%_66%_/_0.12)] text-violet-200 border border-violet-500/20";
    default:
      return "bg-[hsl(220_18%_16%_/_0.7)] text-muted-foreground border border-border";
  }
}

const easeGlass = [0.2, 0.8, 0.2, 1] as const;

const fade: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeGlass },
  },
};

export default function DashboardPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = React.useState<Task[]>(seedTasks);

  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | Status>("all");
  const [priority, setPriority] = React.useState<"all" | Priority>("all");

  const [activeTab, setActiveTab] = React.useState<"tasks" | "profile">("tasks");

  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"create" | "edit">("create");
  const [draft, setDraft] = React.useState<{
    id?: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
  }>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const filtered = tasks.filter((t) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q);
    const matchesStatus = status === "all" ? true : t.status === status;
    const matchesPriority = priority === "all" ? true : t.priority === priority;
    return matchesQuery && matchesStatus && matchesPriority;
  });

  function openCreate() {
    setMode("create");
    setDraft({ title: "", description: "", status: "todo", priority: "medium" });
    setOpen(true);
  }

  function openEdit(task: Task) {
    setMode("edit");
    setDraft({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setOpen(true);
  }

  function save() {
    if (!draft.title.trim()) {
      toast({
        title: "Title is required",
        description: "Give this task a short, clear title.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "create") {
      const id = `tsk_${Math.random().toString(16).slice(2, 8)}`;
      setTasks((prev) => [
        {
          id,
          title: draft.title.trim(),
          description: draft.description.trim(),
          status: draft.status,
          priority: draft.priority,
          createdAt: "Just now",
        },
        ...prev,
      ]);
      toast({ title: "Task created", description: "Saved successfully (mock)." });
      setOpen(false);
      return;
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === draft.id
          ? {
              ...t,
              title: draft.title.trim(),
              description: draft.description.trim(),
              status: draft.status,
              priority: draft.priority,
            }
          : t
      )
    );
    toast({ title: "Task updated", description: "Changes applied (mock)." });
    setOpen(false);
  }

  function remove(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Task deleted", description: "Removed (mock)." });
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "todo" : "done" }
          : t
      )
    );
  }

  return (
    <div className="min-h-screen pb-noise pb-grid">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div variants={fade} className="pb-glass pb-ring rounded-3xl p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[hsl(258_90%_66%_/_0.16)] text-[hsl(258_90%_66%)]">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <div className="pb-title text-2xl" data-testid="text-dashboard-title">
                    Dashboard
                  </div>
                  <div
                    className="text-sm text-muted-foreground"
                    data-testid="text-dashboard-subtitle"
                  >
                    Profile + tasks with search, filters, and smooth CRUD.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="bg-card/40"
                  data-testid="button-about"
                >
                  <a href="/about">
                    <Info className="h-4 w-4" />
                    About
                  </a>
                </Button>

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                  <TabsList data-testid="tabs-dashboard">
                    <TabsTrigger value="tasks" data-testid="tab-dashboard-tasks">
                      Tasks
                    </TabsTrigger>
                    <TabsTrigger value="profile" data-testid="tab-dashboard-profile">
                      Profile
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Button
                  variant="outline"
                  className="bg-card/40"
                  onClick={() => {
                    toast({ title: "Logged out", description: "Session cleared (mock)." });
                    window.location.href = "/auth";
                  }}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {activeTab === "profile" ? (
            <motion.div variants={fade}>
              <Card className="pb-glass pb-ring rounded-3xl">
                <CardHeader>
                  <div className="pb-title text-xl" data-testid="text-profile-title">
                    Your profile
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid="text-profile-desc">
                    This is mock data for the prototype UI.
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label data-testid="label-profile-name">Name</Label>
                    <Input
                      defaultValue="Ava Patel"
                      className="bg-black/20"
                      data-testid="input-profile-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label data-testid="label-profile-email">Email</Label>
                    <Input
                      defaultValue="ava@pulseboard.dev"
                      className="bg-black/20"
                      data-testid="input-profile-email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label data-testid="label-profile-bio">Bio</Label>
                    <Textarea
                      defaultValue="Design-first frontend intern assignment prototype."
                      className="min-h-[96px] bg-black/20"
                      data-testid="input-profile-bio"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between gap-3">
                    <div className="text-xs text-muted-foreground" data-testid="text-profile-hint">
                      Update profile is currently client-side only.
                    </div>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Profile saved",
                          description: "Changes stored in memory (mock).",
                        })
                      }
                      data-testid="button-save-profile"
                    >
                      Save changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <>
              <motion.div variants={fade} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="pb-glass pb-ring rounded-3xl md:col-span-2">
                  <CardHeader className="pb-0">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="pb-title text-xl" data-testid="text-tasks-title">
                          Tasks
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid="text-tasks-desc">
                          Search and filter your list.
                        </div>
                      </div>

                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button onClick={openCreate} data-testid="button-new-task">
                            <Plus className="h-4 w-4" />
                            New task
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="pb-glass pb-ring rounded-3xl">
                          <DialogHeader>
                            <DialogTitle className="pb-title" data-testid="text-task-modal-title">
                              {mode === "create" ? "Create task" : "Edit task"}
                            </DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label data-testid="label-task-title">Title</Label>
                              <Input
                                value={draft.title}
                                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                                className="bg-black/20"
                                placeholder="Short, clear title"
                                data-testid="input-task-title"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label data-testid="label-task-desc">Description</Label>
                              <Textarea
                                value={draft.description}
                                onChange={(e) =>
                                  setDraft((d) => ({
                                    ...d,
                                    description: e.target.value,
                                  }))
                                }
                                className="min-h-[110px] bg-black/20"
                                placeholder="What needs to happen?"
                                data-testid="input-task-description"
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label data-testid="label-task-status">Status</Label>
                                <Select
                                  value={draft.status}
                                  onValueChange={(v) => setDraft((d) => ({ ...d, status: v as Status }))}
                                >
                                  <SelectTrigger className="bg-black/20" data-testid="select-task-status">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="todo" data-testid="option-status-todo">
                                      To do
                                    </SelectItem>
                                    <SelectItem value="in_progress" data-testid="option-status-in-progress">
                                      In progress
                                    </SelectItem>
                                    <SelectItem value="done" data-testid="option-status-done">
                                      Done
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label data-testid="label-task-priority">Priority</Label>
                                <Select
                                  value={draft.priority}
                                  onValueChange={(v) => setDraft((d) => ({ ...d, priority: v as Priority }))}
                                >
                                  <SelectTrigger className="bg-black/20" data-testid="select-task-priority">
                                    <SelectValue placeholder="Priority" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low" data-testid="option-priority-low">
                                      Low
                                    </SelectItem>
                                    <SelectItem value="medium" data-testid="option-priority-medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="high" data-testid="option-priority-high">
                                      High
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <DialogFooter className="gap-2 sm:gap-2">
                            <Button
                              variant="outline"
                              className="bg-card/40"
                              onClick={() => setOpen(false)}
                              data-testid="button-cancel-task"
                            >
                              Cancel
                            </Button>
                            <Button onClick={save} data-testid="button-save-task">
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-5">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="relative md:col-span-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search tasks"
                          className="bg-black/20 pl-9"
                          data-testid="input-search"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <SlidersHorizontal className="h-4 w-4" />
                          <span data-testid="text-filters">Filters</span>
                        </div>

                        <div className="grid w-full grid-cols-2 gap-2">
                          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                            <SelectTrigger className="bg-black/20" data-testid="select-filter-status">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all" data-testid="option-filter-status-all">
                                All statuses
                              </SelectItem>
                              <SelectItem value="todo" data-testid="option-filter-status-todo">
                                To do
                              </SelectItem>
                              <SelectItem value="in_progress" data-testid="option-filter-status-in-progress">
                                In progress
                              </SelectItem>
                              <SelectItem value="done" data-testid="option-filter-status-done">
                                Done
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
                            <SelectTrigger className="bg-black/20" data-testid="select-filter-priority">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all" data-testid="option-filter-priority-all">
                                All priorities
                              </SelectItem>
                              <SelectItem value="low" data-testid="option-filter-priority-low">
                                Low
                              </SelectItem>
                              <SelectItem value="medium" data-testid="option-filter-priority-medium">
                                Medium
                              </SelectItem>
                              <SelectItem value="high" data-testid="option-filter-priority-high">
                                High
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3" data-testid="list-tasks">
                      {filtered.length === 0 ? (
                        <div
                          className="rounded-2xl border border-border/70 bg-black/15 p-6 text-sm text-muted-foreground"
                          data-testid="empty-tasks"
                        >
                          No tasks match your search/filters.
                        </div>
                      ) : (
                        filtered.map((t, index) => (
                          <motion.div
                            key={t.id}
                            className="group rounded-2xl border border-border/70 bg-black/10 p-4 transition-colors hover:bg-black/15"
                            variants={fade}
                            custom={index}
                            data-testid={`row-task-${t.id}`}
                          >
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleDone(t.id)}
                                    className={cn(
                                      "inline-flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
                                      t.status === "done"
                                        ? "border-emerald-500/25 bg-[hsl(140_62%_55%_/_0.14)] text-emerald-200"
                                        : "border-border/70 bg-black/20 text-muted-foreground hover:text-foreground"
                                    )}
                                    data-testid={`button-toggle-done-${t.id}`}
                                    aria-label={
                                      t.status === "done" ? "Mark as not done" : "Mark as done"
                                    }
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <div
                                    className="truncate font-medium"
                                    data-testid={`text-task-title-${t.id}`}
                                  >
                                    {t.title}
                                  </div>
                                </div>

                                <div
                                  className="mt-2 text-sm text-muted-foreground"
                                  data-testid={`text-task-desc-${t.id}`}
                                >
                                  {t.description}
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <Badge
                                    className={cn("rounded-xl", statusBadge(t.status))}
                                    data-testid={`badge-status-${t.id}`}
                                  >
                                    {t.status.replace("_", " ")}
                                  </Badge>
                                  <Badge
                                    className={cn("rounded-xl", priorityBadge(t.priority))}
                                    data-testid={`badge-priority-${t.id}`}
                                  >
                                    {t.priority}
                                  </Badge>
                                  <span
                                    className="text-xs text-muted-foreground"
                                    data-testid={`text-task-created-${t.id}`}
                                  >
                                    {t.createdAt}
                                  </span>
                                </div>
                              </div>

                              <div className="flex shrink-0 items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="outline"
                                  className="bg-card/40"
                                  onClick={() => openEdit(t)}
                                  data-testid={`button-edit-${t.id}`}
                                >
                                  Edit
                                  <ChevronDown className="h-4 w-4 opacity-60" />
                                </Button>
                                <Button
                                  variant="outline"
                                  className="bg-card/40"
                                  onClick={() => remove(t.id)}
                                  data-testid={`button-delete-${t.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="pb-glass pb-ring rounded-3xl">
                  <CardHeader>
                    <div className="pb-title text-xl" data-testid="text-insights-title">
                      Insights
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-insights-desc">
                      Quick status overview.
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div
                      className="rounded-2xl border border-border/70 bg-black/10 p-4"
                      data-testid="card-insight-total"
                    >
                      <div className="text-xs text-muted-foreground">Total tasks</div>
                      <div className="pb-title mt-1 text-2xl">{tasks.length}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="rounded-2xl border border-border/70 bg-black/10 p-4"
                        data-testid="card-insight-done"
                      >
                        <div className="text-xs text-muted-foreground">Done</div>
                        <div className="pb-title mt-1 text-2xl">
                          {tasks.filter((t) => t.status === "done").length}
                        </div>
                      </div>
                      <div
                        className="rounded-2xl border border-border/70 bg-black/10 p-4"
                        data-testid="card-insight-inprogress"
                      >
                        <div className="text-xs text-muted-foreground">In progress</div>
                        <div className="pb-title mt-1 text-2xl">
                          {tasks.filter((t) => t.status === "in_progress").length}
                        </div>
                      </div>
                    </div>

                    <div
                      className="rounded-2xl border border-border/70 bg-black/10 p-4"
                      data-testid="card-insight-filtered"
                    >
                      <div className="text-xs text-muted-foreground">Showing</div>
                      <div className="pb-title mt-1 text-2xl">{filtered.length}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        Based on your current filters.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
