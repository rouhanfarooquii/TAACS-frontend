<script>
  import CardStackedBarChart from "components/Cards/CardStackedBarChart.svelte";
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPieChart from "components/Cards/CardPieChart.svelte";
  import CardMetric from "components/Cards/CardMetric.svelte";
  import DateFilter from "components/Cards/DateFilter.svelte";
  import { getAllAttendances, getAllLeavesApi } from '../../../services/api'; // Adjust the import according to your project structure

  let startDate = '';
  let endDate = '';
  let totalLeaves = 0;
  let totalAttendance = 0;
  let totalAbsentees = 0;

  function handleUpdate(event) {
    startDate = event.detail.startDate;
    endDate = event.detail.endDate;
    applyDateFilter();
  }

  async function fetchData() {
    try {
      const [attendances, leaves] = await Promise.all([
        getAllAttendances(startDate, endDate),
        getAllLeavesApi(startDate, endDate)
      ]);

      totalAttendance = attendances.filter(record => record.attendance === 'Present').length;
      totalLeaves = leaves.filter(request => request.status === 'approved').length;
      totalAbsentees = attendances.filter(record => record.attendance === 'Absent').length;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  function applyDateFilter() {
    fetchData();
  }

  $: if (startDate && endDate) {
    fetchData();
  }
</script>

<DateFilter on:update={handleUpdate} />

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <h3 class="font-semibold text-lg text-blueGray-700">
    Dashboard
  </h3>
  <br/>
  <div class="flex flex-wrap items-center">
    <div class="w-full lg:w-6/12 px-4">
      <DateFilter on:update={handleUpdate} />
    </div>
    <div class="w-full lg:w-6/12 px-4">
      <div class="flex items-end">
        <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-2" on:click={applyDateFilter}>
          Apply
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap mt-4">
    <div class="w-full sm:w-4/12 px-4">
      <CardMetric title="Total Leaves" value={totalLeaves} color="#ed64a6" />
    </div>
    <div class="w-full sm:w-4/12 px-4">
      <CardMetric title="Total Attendance" value={totalAttendance} color="#4c51bf" />
    </div>
    <div class="w-full sm:w-4/12 px-4">
      <CardMetric title="Total Absentees" value={totalAbsentees} color="#f44336" />
    </div>
  </div>
  <div class="flex flex-wrap mt-4">
    <div class="w-full lg:w-6/12 xl:w-4/12 px-4 mb-12 xl:mb-0">
      <CardPieChart />
    </div>
    <div class="w-full lg:w-6/12 xl:w-8/12 px-4">
      <div class="mb-12">
        <CardLineChart {startDate} {endDate} />
      </div>
      <div>
        <CardBarChart {startDate} {endDate} />
      </div>
    </div>
  </div>
</div>
